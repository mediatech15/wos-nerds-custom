export async function onRequestPost (context) {
  const x = await context.request.json()
  return Response.json({
    context: context,
    request: x,
    msg: "Yo"
  }, {
    status: 200,
    statusText: 'OK',
  })
}
