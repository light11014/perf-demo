# Product Search 상호작용 시나리오

## 1. 시나리오 정보

- SCENARIO_NAME: rerender-scenario
- SCENARIO_TYPE: interaction
- URL: http://localhost:3000/interaction/rerender
- DESCRIPTION: 상품 검색/필터링/정렬 및 장바구니 추가 INP 측정

## 2. 측정 조건

- CACHE_DISABLED: false
- NETWORK_THROTTLING: none
- CPU_THROTTLING: none

## 3. 액션 시퀀스

```
1. http://localhost:3000/interaction/rerender 접속
2. 3초 대기
3. #product-search-input (상품 검색 input) 클릭 후 "Product" 입력
4. 2초 대기
5. #category-select (카테고리 드롭다운) 클릭 후 "Electronics" 선택
6. 2초 대기
7. #sort-select (정렬 드롭다운) 클릭 후 "Price: Low to High" 선택
8. 2초 대기
9. #add-to-cart-btn-0 (첫 번째 상품의 Add to Cart 버튼) 클릭
10. 2초 대기
11. 성능 Trace 중단
```

### 요소 ID 매핑

| ID | 요소 설명 |
|---|---|
| `#product-search-input` | 상품 검색 input 필드 |
| `#category-select` | 카테고리 필터 select 드롭다운 |
| `#sort-select` | 정렬 기준 select 드롭다운 |
| `#add-to-cart-btn-{n}` | n번째 상품의 Add to Cart 버튼 (0부터 시작) |

## 4. 측정 메트릭

**주요 메트릭:**

- INP (핵심), Event Handler Duration, TBT

**분석 초점:**

- INP: 검색/필터/정렬/클릭 후 화면 업데이트까지 시간
- Event Handler: 핸들러 실행 시간
- TBT: JavaScript 차단 시간

## 5. 분석 포커스 (interaction 특화)

### Event Handler 최적화

- 핸들러 내부의 무거운 계산
- 불필요한 setState 호출
- 비동기 작업 처리

### State Updates

- 불필요한 리렌더링
- 상태 업데이트 배치 처리
- 메모이제이션 활용 (useMemo, useCallback)

### Layout Stability

- 클릭 후 예기치 않은 레이아웃 이동
- 동적 콘텐츠 삽입 시 공간 예약

## 6. 예상 병목 패턴

1. **느린 이벤트 핸들러** → INP 영향
2. **과도한 상태 업데이트** → INP, TBT 영향
3. **동기 API 호출** → INP, TBT 영향
4. **대규모 DOM 조작** → INP, CLS 영향
