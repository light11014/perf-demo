export async function GET() {
  // 300ms 지연
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('🌐 API 요청 발생!');
  
  return Response.json({ 
    id: Math.random(), 
    data: '샘플 데이터',
    timestamp: new Date().toISOString()
  });
}
