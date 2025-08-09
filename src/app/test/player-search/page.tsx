"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlayerSearchTestPage() {
  const [playerName, setPlayerName] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const testPlayerSearch = async () => {
    if (!playerName) {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/er/player-search?playerName=${encodeURIComponent(
        playerName
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // 디버깅 정보
      console.log("플레이어 검색 API 응답:", data);
      console.log("응답 구조 분석:");
      console.log("- data.userNum:", data?.data?.userNum);
      console.log("- userNum:", data?.userNum);
      console.log("- user.userNum:", data?.user?.userNum);

      setResult(data);
    } catch (error) {
      console.error("API 호출 오류:", error);
      setResult({ error: "API 호출 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/test"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← 테스트 메인으로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">🔍 플레이어 검색 테스트</h1>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">API 정보:</h2>
        <p>
          <strong>엔드포인트:</strong> <code>/v1/user/nickname</code>
        </p>
        <p>
          <strong>설명:</strong> 닉네임으로 플레이어 정보를 검색합니다
        </p>
        <p>
          <strong>주요 응답:</strong> userNum, nickname 등
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">플레이어 이름:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="플레이어 이름을 입력하세요"
          onKeyPress={(e) => e.key === "Enter" && testPlayerSearch()}
        />
      </div>

      <div className="mb-6">
        <button
          onClick={testPlayerSearch}
          disabled={loading || !playerName}
          className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 text-lg font-semibold transition-colors"
        >
          {loading ? "검색 중..." : "플레이어 검색하기"}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            플레이어 정보를 검색하고 있습니다...
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">검색 결과:</h2>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          {/* userNum 추출 결과 표시 */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold mb-2">UserNum 추출 결과:</h3>
            {(() => {
              const data = result as any;
              if (data?.data?.userNum) {
                return (
                  <p className="text-green-600">
                    ✅ data.userNum: <strong>{data.data.userNum}</strong>
                  </p>
                );
              } else if (data?.userNum) {
                return (
                  <p className="text-green-600">
                    ✅ userNum: <strong>{data.userNum}</strong>
                  </p>
                );
              } else if (data?.user?.userNum) {
                return (
                  <p className="text-green-600">
                    ✅ user.userNum: <strong>{data.user.userNum}</strong>
                  </p>
                );
              } else {
                return (
                  <p className="text-red-600">❌ userNum을 찾을 수 없습니다</p>
                );
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
