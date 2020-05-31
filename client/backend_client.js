export const fetchBoard = (queryParams) => {
  const qstring = queryParams || "";
  fetch(`http://localhost:8080/game/${qstring}`)
    .then(res => res.json())
    .then((board) => {
      console.log(board);
    }).catch(console.log);
};
