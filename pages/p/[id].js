export async function getServerSideProps({ params, req, res }) {
  const r = await fetch(`${process.env.BASE_URL}/api/pastes/${params.id}`, {
    headers: {
      "x-test-now-ms": req.headers["x-test-now-ms"] || ""
    }
  });

  if (!r.ok) {
    res.statusCode = 404;
    return { notFound: true };
  }

  const data = await r.json();
  return { props: { content: data.content } };
}

export default function Page({ content }) {
  return <pre>{content}</pre>;
}
