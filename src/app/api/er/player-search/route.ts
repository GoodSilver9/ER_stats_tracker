import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playerName = searchParams.get("playerName");
    const apiKey = process.env.ER_API_KEY;

    if (!apiKey || !playerName) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았거나 플레이어 이름이 필요합니다." },
        { status: 400 }
      );
    }

    // 실제 ER API 호출 테스트
    try {
      const response = await fetch(
        `https://open-api.bser.io/v1/user/nickname?query=${encodeURIComponent(
          playerName
        )}`,
        {
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API 응답 상태:", response.status);
      console.log(
        "API 응답 헤더:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("API 오류 응답:", errorText);
        throw new Error(`API 호출 실패: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API 성공 응답:", data);
      return NextResponse.json(data);
    } catch (apiError) {
      console.error("실제 API 호출 실패:", apiError);

      // API 호출 실패 시 더미 데이터 반환 (개발용)
      const dummySearchResult = {
        data: {
          userNum: 12345678,
          nickname: playerName,
          level: 45,
          rank: "Platinum",
          server: "KR",
        },
        default: {
          server: "KR",
          season: "2024",
          language: "ko",
        },
        message: "실제 API 엔드포인트 확인 후 수정 필요",
        apiError: apiError.message,
      };

      return NextResponse.json(dummySearchResult);
    }
  } catch (error) {
    console.error("플레이어 검색 오류:", error);
    return NextResponse.json(
      { error: "플레이어 검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
