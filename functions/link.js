export function onRequestPost (context) {
  return new Response(JSON.stringify({
    context: context,
    msg: "Yo"
  }))
}
