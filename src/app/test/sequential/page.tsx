"use client";

import { useState } from "react";
import Link from "next/link";

interface ApiStep {
  step: number;
  name: string;
  status: "pending" | "loading" | "success" | "error";
  data?: any;
  error?: string;
}

export default function SequentialTestPage() {
  const [playerName, setPlayerName] = useState("");
  const [steps, setSteps] = useState<ApiStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [userNum, setUserNum] = useState<number | null>(null);

  const resetSteps = () => {
    setSteps([
      { step: 1, name: "플레이어 검색", status: "pending" },
      { step: 2, name: "게임 기록 조회", status: "pending" },
    ]);
  };

  const updateStep = (stepNumber: number, updates: Partial<ApiStep>) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.step === stepNumber ? { ...step, ...updates } : step
      )
    );
  };

  const testSequentialApi = async () => {
    if (!playerName) {
      alert("플레이어 이름을 입력해주세요");
      return;
    }

    setLoading(true);
    resetSteps();

    try {
      // 1단계: 플레이어 검색
      updateStep(1, { status: "loading" });

      const playerSearchUrl = `/api/er/player-search?playerName=${encodeURIComponent(
        playerName
      )}`;
      const playerResponse = await fetch(playerSearchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const playerData = await playerResponse.json();

      console.log("1단계 - 플레이어 검색 결과:", playerData);

      // userNum 추출 시도
      let foundUserNum = null;

      if (playerData?.data?.userNum) {
        foundUserNum = playerData.data.userNum;
      } else if (playerData?.userNum) {
        foundUserNum = playerData.userNum;
      } else if (playerData?.user?.userNum) {
        foundUserNum = playerData.user.userNum;
      }

      if (!foundUserNum) {
        updateStep(1, {
          status: "error",
          data: playerData,
          error: "userNum을 찾을 수 없습니다",
        });
        updateStep(2, {
          status: "error",
          error: "1단계 실패로 인한 중단",
        });
        return;
      }

      updateStep(1, {
        status: "success",
        data: playerData,
      });
      setUserNum(foundUserNum);

      // 2단계: 게임 기록 조회
      updateStep(2, { status: "loading" });

      const gamesUrl = `/api/er/games?userNum=${foundUserNum}`;
      const gamesResponse = await fetch(gamesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const gamesData = await gamesResponse.json();

      console.log("2단계 - 게임 기록 조회 결과:", gamesData);

      updateStep(2, {
        status: "success",
        data: gamesData,
      });
    } catch (error) {
      console.error("연속 API 호출 오류:", error);
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";

      // 현재 진행 중인 단계에 오류 표시
      setSteps((prev) =>
        prev.map((step) =>
          step.status === "loading"
            ? { ...step, status: "error", error: errorMessage }
            : step
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: ApiStep["status"]) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "loading":
        return "🔄";
      case "success":
        return "✅";
      case "error":
        return "❌";
    }
  };

  const getStatusColor = (status: ApiStep["status"]) => {
    switch (status) {
      case "pending":
        return "text-gray-500";
      case "loading":
        return "text-blue-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
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

      <h1 className="text-3xl font-bold mb-6">🔗 연속 API 호출 테스트</h1>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">테스트 시나리오:</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>플레이어 이름으로 검색 → userNum 추출</li>
          <li>추출한 userNum으로 게임 기록 조회</li>
        </ol>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">플레이어 이름:</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="플레이어 이름을 입력하세요"
          onKeyPress={(e) => e.key === "Enter" && testSequentialApi()}
        />
        {userNum && (
          <p className="mt-2 text-sm text-gray-600">현재 UserNum: {userNum}</p>
        )}
      </div>

      <div className="mb-6">
        <button
          onClick={testSequentialApi}
          disabled={loading || !playerName}
          className="w-full p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 text-lg font-semibold transition-colors"
        >
          {loading ? "연속 호출 진행 중..." : "연속 API 호출 시작"}
        </button>
      </div>

      {/* 진행 상황 표시 */}
      {steps.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">진행 상황:</h2>
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.step}
                className={`p-4 rounded-lg border ${
                  step.status === "success"
                    ? "bg-green-50 border-green-200"
                    : step.status === "error"
                    ? "bg-red-50 border-red-200"
                    : step.status === "loading"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getStatusIcon(step.status)}
                    </span>
                    <div>
                      <h3 className="font-semibold">
                        {step.step}단계: {step.name}
                      </h3>
                      <p className={`text-sm ${getStatusColor(step.status)}`}>
                        {step.status === "pending" && "대기 중"}
                        {step.status === "loading" && "진행 중..."}
                        {step.status === "success" && "완료"}
                        {step.status === "error" && `오류: ${step.error}`}
                      </p>
                    </div>
                  </div>
                </div>

                {step.data && (
                  <div className="mt-3 p-3 bg-white rounded border">
                    <details>
                      <summary className="cursor-pointer text-sm font-medium">
                        응답 데이터 보기
                      </summary>
                      <pre className="mt-2 text-xs overflow-auto max-h-40">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
