function getTimeBoard(writeDt) {
  const now = new Date();
  const diff = now.getTime() - new Date(writeDt).getTime();
  const diffSeconds = diff / 1000;
  const diffMinutes = diff / (60 * 1000);
  const diffHours = diff / (60 * 60 * 1000);
  const diffDays = diff / (24 * 60 * 60 * 1000);

  if (diffSeconds < 60) {
    return "방금 전";
  } else if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)}분 전`;
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}시간 전`;
  } else if (diffDays < 7) {
    return `${Math.floor(diffDays)}일 전`;
  } else {
    const date = new Date(writeDt); // UTC 시간으로 변환한 값을 다시 한국시간으로 변환
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }
}

export default getTimeBoard;
