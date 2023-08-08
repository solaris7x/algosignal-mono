const deleteEvent = async (eventID: string) => {
  try {
    // Call delete event endpoint
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
      }/events/${eventID}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    // Check if delete event was successful
    if (!response.ok) {
      throw new Error("Server responded with " + response.status + " status");
    }

    // Return the event data
    return await response.json();
  } catch (err) {
    console.error(err);
    alert("Failed to delete event" + err);
  }
};

export default deleteEvent;
