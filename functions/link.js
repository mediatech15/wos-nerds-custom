export function onRequestPost (context) {
  return new Response.json({
    context: context,
    msg: "Yo"
  }, {
    status: 200,
    statusText: 'OK',
  })
}
