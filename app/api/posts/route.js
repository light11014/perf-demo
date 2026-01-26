export async function GET() {
  // 800ms 지연
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return Response.json(
    Array.from({ length: 5 }, (_, i) => ({ 
      id: i, 
      title: `Post ${i}`,
      content: `This is post number ${i}`
    }))
  );
}
