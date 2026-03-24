export function getSession() {

    return JSON.parse(localStorage.getItem('gymFlowSession')) || {
      user: {
        name: "Leo Nahrdo",
        role: "coach",
        student: [],
        token: "..."
      }
    };

    
}