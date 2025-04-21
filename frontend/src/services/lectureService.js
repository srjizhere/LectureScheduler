import api from "./api";



export const getLectures = async () => {
  const res = await api.get("/lectures");
  return res.data;
};

export const scheduleLecture = async (data) => {
  const res = await api.post("/lectures", data);
  return res.data;
};
export const deleteLecture = async (id) => {
  const res = await api.delete(`/lectures/${id}`);
  return res.data;
}


export const markLectureAsAttended = async (lectureId) => {
  try {
    const res = await fetch(`/api/lectures/${lectureId}/mark-attended`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to mark lecture as attended");
    }

    return await res.json();
  } catch (error) {
    console.error("Error marking lecture as attended:", error);
    throw error;
  }
};
