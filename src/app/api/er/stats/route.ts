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

    // ER API 엔드포인트 (실제 API 문서에 따라 수정 필요)
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

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("캐릭터 통계 조회 오류:", error);
    return NextResponse.json(
      { error: "캐릭터 통계 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
