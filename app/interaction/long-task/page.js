'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

// 데이터 유효성 검증 유틸리티 함수
function validateCustomerData(customer) {
  // 이메일 형식 검증 (매번 새로운 정규표현식 생성)
  const emailPattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const isValidEmail = emailPattern.test(customer.email);

  // 이름 검증 - 특수문자 체크
  const namePattern = new RegExp('^[a-zA-Z0-9\\s]+$');
  const isValidName = namePattern.test(customer.name);

  // 금액 범위 검증
  const isValidAmount = customer.amount >= 0 && customer.amount <= 100000;

  return isValidEmail && isValidName && isValidAmount;
}

// 검색 관련성 점수 계산 (복잡한 매칭 알고리즘)
function calculateRelevanceScore(item, searchTerm) {
  let score = 0;
  const lowerSearch = searchTerm.toLowerCase();
  const lowerName = item.name.toLowerCase();
  const lowerEmail = item.email.toLowerCase();

  // 정확히 일치하면 높은 점수
  if (lowerName === lowerSearch) score += 100;
  if (lowerEmail === lowerSearch) score += 100;

  // 시작 부분 일치
  if (lowerName.startsWith(lowerSearch)) score += 50;
  if (lowerEmail.startsWith(lowerSearch)) score += 50;

  // 포함 여부
  if (lowerName.includes(lowerSearch)) score += 25;
  if (lowerEmail.includes(lowerSearch)) score += 25;

  // 각 단어별 부분 일치 검사
  const searchWords = lowerSearch.split(' ');
  const nameWords = lowerName.split(' ');

  searchWords.forEach(searchWord => {
    nameWords.forEach(nameWord => {
      if (nameWord.includes(searchWord)) score += 10;
      // 레벤슈타인 거리 유사 계산 (간단 버전)
      let matches = 0;
      for (let i = 0; i < Math.min(searchWord.length, nameWord.length); i++) {
        if (searchWord[i] === nameWord[i]) matches++;
      }
      score += matches;
    });
  });

  return score;
}

// 통계 계산 함수
function calculateStatistics(data) {
  const stats = {
    totalAmount: 0,
    avgAmount: 0,
    maxAmount: 0,
    minAmount: Infinity,
    activeCount: 0,
    pendingCount: 0,
    inactiveCount: 0
  };

  // 모든 데이터를 순회하며 통계 계산
  data.forEach(item => {
    stats.totalAmount += item.amount;
    if (item.amount > stats.maxAmount) stats.maxAmount = item.amount;
    if (item.amount < stats.minAmount) stats.minAmount = item.amount;

    if (item.status === 'Active') stats.activeCount++;
    else if (item.status === 'Pending') stats.pendingCount++;
    else stats.inactiveCount++;
  });

  stats.avgAmount = data.length > 0 ? stats.totalAmount / data.length : 0;

  return stats;
}

// 데이터 정렬 함수 (비효율적인 다중 기준 정렬)
function sortDataByMultipleCriteria(data, searchTerm) {
  // 깊은 복사로 원본 보호 (비효율적)
  const clonedData = JSON.parse(JSON.stringify(data));

  return clonedData.sort((a, b) => {
    // 먼저 검색 관련성으로 정렬
    const scoreA = calculateRelevanceScore(a, searchTerm);
    const scoreB = calculateRelevanceScore(b, searchTerm);

    if (scoreA !== scoreB) return scoreB - scoreA;

    // 관련성이 같으면 상태순
    const statusOrder = { 'Active': 0, 'Pending': 1, 'Inactive': 2 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }

    // 상태도 같으면 금액 내림차순
    return b.amount - a.amount;
  });
}

export default function DataTablePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [exportStatus, setExportStatus] = useState('');

  // 초기 데이터 생성 (15000개 - 검색 시 INP 500~1000ms, 렌더링은 100개로 제한)
  const data = useMemo(
    () => Array.from({ length: 15000 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      amount: Math.floor(Math.random() * 10000),
      status: ['Active', 'Pending', 'Inactive'][i % 3],
      date: new Date(2026, 0, Math.floor(Math.random() * 26) + 1).toLocaleDateString()
    })),
    []
  );

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const value = e.target.value;

    // 입력값 검증 및 정리
    const sanitizedValue = value.replace(/[<>]/g, '').trim();

    // 검색 로그 기록을 위한 데이터 준비 (실제로는 불필요한 작업)
    const searchLog = {
      timestamp: new Date().toISOString(),
      term: sanitizedValue,
      dataSize: data.length,
      // 전체 데이터의 현재 상태 스냅샷 (불필요한 직렬화)
      dataSnapshot: JSON.stringify(data.slice(0, 100))
    };

    // 로그 검증 (의미없는 작업)
    JSON.parse(searchLog.dataSnapshot);

    setSearchTerm(sanitizedValue);
  };

  // Export 버튼 클릭 핸들러
  const handleExportClick = () => {
    // CSV 생성을 위한 데이터 준비
    const exportData = data.map(item => {
      // 각 항목 유효성 검증
      const isValid = validateCustomerData(item);

      // 데이터 포맷팅
      return {
        ...item,
        isValid,
        formattedAmount: `$${item.amount.toLocaleString()}`,
        formattedDate: new Date(item.date).toLocaleDateString('ko-KR'),
        // 추가 메타데이터 생성
        hash: btoa(JSON.stringify(item))
      };
    });

    // CSV 문자열 생성 (메모리 비효율적)
    let csvContent = 'ID,Name,Email,Amount,Status,Date,Valid\n';
    exportData.forEach(item => {
      csvContent += `${item.id},${item.name},${item.email},${item.formattedAmount},${item.status},${item.formattedDate},${item.isValid}\n`;
    });

    // 검증을 위해 다시 파싱 (불필요)
    const lines = csvContent.split('\n');
    lines.forEach(line => line.split(','));

    setExportStatus('Exported!');
    setTimeout(() => setExportStatus(''), 2000);
  };

  // 필터링된 데이터 계산
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    // 검색 전 모든 데이터 유효성 검증 (불필요)
    const validatedData = data.filter(item => validateCustomerData(item));

    // 검색어 매칭
    const matchedData = validatedData.filter(item => {
      const score = calculateRelevanceScore(item, searchTerm);
      return score > 0;
    });

    // 통계 계산 (결과에 사용하지 않음)
    calculateStatistics(matchedData);

    // 정렬 적용
    return sortDataByMultipleCriteria(matchedData, searchTerm);
  }, [data, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← Home</Link>
          <h1 className="text-2xl font-bold">Customer Data</h1>
          <button
            id="export-csv-btn"
            onClick={handleExportClick}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {exportStatus || 'Export CSV'}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow mb-6 p-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-2xl font-bold">{filteredData.length.toLocaleString()}</div>
          </div>
          <div>
            <input
              id="customer-search-input"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search customers..."
              className="px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.slice(0, 100).map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${row.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' :
                        row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
