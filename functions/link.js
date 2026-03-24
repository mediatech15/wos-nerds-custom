export async function onRequestPost (context) {
  const x = await context.request.json()
  const h = {}
  for (const k of context.request.headers.keys()){
    h[k] = context.request.headers.get(k)
  }
  return Response.json({
    context: context,
    url: context.request.url,
    cf: context.request.cf,
    request: x,
    headers: h,
    msg: "Yo"
  }, {
    status: 200,
    statusText: 'OK',
  })
}
