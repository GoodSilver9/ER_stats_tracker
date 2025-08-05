"use client";

import { useState } from "react";

export default function ApiTestPage() {
  const [playerName, setPlayerName] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const testApi = async (endpoint: string) => {
    if (!playerName && endpoint !== "ranking") {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    try {
      let apiEndpoint = endpoint;
      let requestBody: any = {};

      // 엔드포인트별로 다른 파라미터 처리
      if (endpoint === "ranking") {
        apiEndpoint = "ranking";
        requestBody = {};
      } else if (endpoint === "player-search") {
        apiEndpoint = "player-search";
        requestBody = { playerName };
      } else {
        requestBody = { playerName };
      }

      let url = `/api/er/${apiEndpoint}`;
      if (playerName && endpoint !== "ranking") {
        url += `?playerName=${encodeURIComponent(playerName)}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
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
      <h1 className="text-3xl font-bold mb-6">
        ER API 테스트 - /v1/user/nickname
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">플레이어 이름:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="플레이어 이름을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => testApi("player-search")}
          disabled={loading || !playerName}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 text-lg font-semibold w-full"
        >
          플레이어 검색 테스트 (/v1/user/nickname)
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">API 호출 중...</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">결과:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
