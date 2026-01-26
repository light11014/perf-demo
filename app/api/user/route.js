export async function GET() {
  // 600ms 지연
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return Response.json({ 
    name: '홍길동', 
    id: 1,
    email: 'hong@example.com'
  });
}
