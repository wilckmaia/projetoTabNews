test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdateAt = new Date(responseBody.update_At).toISOString();
  expect(responseBody.update_At).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.version).toEqual("17.2");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.openned_connections).toEqual(1);
});
