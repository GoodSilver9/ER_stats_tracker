"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface StatsData {
  userNum?: number;
  seasonId?: number;
  playerName?: string;
  // 실제 stats 데이터 구조에 맞게 추가
  [key: string]: any;
}

export default function StatsPage() {
  const params = useParams();
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL에서 userNum과 seasonId 추출
  const userNum = params.userNum as string;
  const seasonId = params.seasonId as string;

  useEffect(() => {
    const fetchStats = async () => {
      if (!userNum || !seasonId) {
        setError("userNum과 seasonId가 필요합니다");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // stats API 호출
        const response = await fetch(
          `/api/er/stats?userNum=${userNum}&seasonId=${seasonId}&playerName=test`
        );

        if (!response.ok) {
          throw new Error(`API 호출 실패: ${response.status}`);
        }

        const data = await response.json();
        setStatsData(data);
        console.log("Stats 데이터:", data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "알 수 없는 오류";
        setError(errorMessage);
        console.error("Stats 조회 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userNum, seasonId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 플레이어 통계</h1>

      {/* 파라미터 정보 표시 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">현재 파라미터:</h2>
        <p>
          <strong>UserNum:</strong> {userNum}
        </p>
        <p>
          <strong>SeasonId:</strong> {seasonId}
        </p>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <p>📡 통계 데이터를 불러오는 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
          <h3 className="font-semibold text-red-800">❌ 오류 발생</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* 통계 데이터 표시 */}
      {statsData && !loading && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">✅ 통계 데이터</h3>
          <div className="bg-white p-4 rounded border">
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(statsData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* 사용법 안내 */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">💡 사용법:</h3>
        <p className="text-sm text-gray-600">
          URL 예시: <code>/stats/123/456</code> (userNum=123, seasonId=456)
        </p>
      </div>
    </div>
  );
}
