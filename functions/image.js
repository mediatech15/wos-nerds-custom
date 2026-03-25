export async function onRequestPost (context) {
  let body
  try {
    body = await context.request.json()
  } catch {
    return new Response('Error getting body', { status: 400 })
  }
  const headers = {}
  for (const k of context.request.headers.keys()) {
    headers[k] = context.request.headers.get(k)
  }
  if (headers.origin !== 'https://wos-tools.fidgetcode.dev') {
    return new Response('Forbidden', { status: 403 })
  }
  if (!headers.referer.startsWith('https://wos-tools.fidgetcode.dev/')) {
    return new Response('Forbidden', { status: 403 })
  }
  if (headers['sec-fetch-site'] !== 'same-origin') {
    return new Response('Forbidden', { status: 403 })
  }

  if (body.data === undefined) {
    return new Response('data must be defined in body', { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 100000)
  const formData = new URLSearchParams()
  formData.set('source', body.data)
  formData.set('key', '6d207e02198a847aa98d0a2a901485a5')
  formData.set('action', 'upload')
  const resp = await fetch('https://freeimage.host/api/1/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString(),
    signal: controller.signal
  })
  clearTimeout(timeout)

  if (resp.ok) {
    const linkData = await resp.json()
    return Response.json(linkData)
  }

  const err = await resp.text()
  return new Response('error creating short link', { status: 400, statusText: err })
}
