export async function GET() {
  // 400ms 지연
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return Response.json(
    Array.from({ length: 10 }, (_, i) => ({ 
      id: i, 
      text: `Comment ${i}`,
      author: `User ${i}`
    }))
  );
}
