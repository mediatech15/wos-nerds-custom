export async function onRequestPost (context) {
  let body
  try{
    body = await context.request.json()
  } catch {
    return new Response('Error getting body', {status: 400})
  }
  const headers = {}
  for (const k of context.request.headers.keys()){
    headers[k] = context.request.headers.get(k)
  }
  if (headers.origin !== 'https://wos-tools.fidgetcode.dev') {
    return new Response('Forbidden', {status: 403})
  }
  if (headers.referer !== 'https://wos-tools.fidgetcode.dev/') {
    return new Response('Forbidden', {status: 403})
  }
  if (headers['sec-fetch-site'] !== 'same-origin') {
    return new Response('Forbidden', {status: 403})
  }

  if (body.url === undefined) {
    return new Response('url must be defined in body', {status: 400})
  }
  if (body.id === undefined) {
    return new Response('id must be defined in body', {status: 400})
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const reqBody = new URLSearchParams({
    action: 'save_by_keyword',
    keyword: body.id,
    url: body.url,
    format: 'json',
    signature: '24b1328eb0'
  }).toString()
  const link = await fetch('https://micro.pink/yourls-api.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: reqBody,
    signal: controller.signal
  })
  clearTimeout(timeout)

  if (link.ok) {
    const linkData = await link.json()
    const jsonData = JSON.parse(linkData)
    return Response.json({
      link: jsonData.shorturl,
      message: jsonData.message
    })
  }

  const err = await link.text()
  return new Response('error creating short link', {status: 400, statusText: err})
}
