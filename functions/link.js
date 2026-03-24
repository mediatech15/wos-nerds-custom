export function onRequestPost (context) {
  return new Response(JSON.stringify({
    context: context,
    msg: "Yo"
  }), {
    status: 200,
    statusText: 'OK',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
}
