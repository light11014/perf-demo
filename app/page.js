export default function Home() {
  const cases = [
    {
      category: '네트워크',
      items: [
        { 
          title: 'Waterfall 문제', 
          path: '/network/waterfall',
          issue: '순차 API 요청으로 LCP 느림',
          metric: 'LCP: ~3.5s'
        },
        { 
          title: '캐싱 없음', 
          path: '/network/no-cache',
          issue: '동일한 데이터를 반복 요청',
          metric: '불필요한 요청 3회'
        }
      ]
    },
    {
      category: '번들',
      items: [
        { 
          title: '무거운 Import', 
          path: '/bundle/heavy-import',
          issue: 'lodash 전체 import',
          metric: '번들 크기: +70KB'
        },
        { 
          title: 'Code Splitting 없음', 
          path: '/bundle/no-split',
          issue: '모든 페이지를 한 번에 로드',
          metric: '초기 번들: 1.2MB'
        }
      ]
    },
    {
      category: '렌더링 (정적)',
      items: [
        { 
          title: 'CLS 문제', 
          path: '/rendering/cls',
          issue: '이미지 크기 미지정',
          metric: 'CLS: 0.25'
        },
        { 
          title: '느린 LCP', 
          path: '/rendering/slow-lcp',
          issue: '큰 이미지 + JS 블로킹',
          metric: 'LCP: 4.2s'
        },
        { 
          title: '블로킹 CSS', 
          path: '/rendering/blocking-css',
          issue: '외부 CSS가 렌더링 차단',
          metric: 'FCP: 3.8s'
        },
        { 
          title: '여러 큰 이미지', 
          path: '/rendering/multiple-images',
          issue: '20개의 큰 이미지 동시 로드',
          metric: 'LCP: 5.2s'
        },
        { 
          title: '웹폰트 FOIT', 
          path: '/rendering/font-loading',
          issue: '폰트 로딩 중 텍스트 안보임',
          metric: 'FCP: 2.9s'
        },
        { 
          title: '미최적화 랜딩', 
          path: '/rendering/unoptimized-landing',
          issue: '거대한 배경 이미지 + 다수 리소스',
          metric: 'LCP: 6.1s'
        }
      ]
    },
    {
      category: '인터랙션 (동적)',
      items: [
        { 
          title: '불필요한 리렌더', 
          path: '/interaction/rerender',
          issue: 'useMemo 없는 무거운 계산',
          metric: '렌더링: 850ms'
        },
        { 
          title: 'Long Task', 
          path: '/interaction/long-task',
          issue: '10,000개 리스트 렌더링',
          metric: 'TBT: 2300ms'
        }
      ]
    }
  ];

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">
        🐌 성능 병목 케이스 모음
      </h1>
      <p className="text-gray-600 mb-8">
        각 케이스를 클릭하여 실제 성능 문제를 확인하세요
      </p>
      
      {cases.map((category) => (
        <section key={category.category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            {category.category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((item) => (
              <a 
                key={item.path}
                href={item.path}
                className="border rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <h3 className="font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {item.issue}
                </p>
                <span className="inline-block bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">
                  {item.metric}
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
