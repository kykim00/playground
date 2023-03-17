export async function GET(request: Request) {
  return new Response(
    JSON.stringify([
      {
        name: 'Slade Mcleod',
        phone: '1-505-955-2581',
        email: 'eu@hotmail.edu',
        list: 1,
        country: 'Nigeria',
        region: 'South Island',
      },
      {
        name: 'Michael Carlson',
        phone: '(456) 496-1738',
        email: 'lorem.vehicula@outlook.couk',
        list: 9,
        country: 'Brazil',
        region: 'Zhytomyr oblast',
      },
      {
        name: 'Yeo Downs',
        phone: '1-786-350-9576',
        email: 'mi@outlook.net',
        list: 7,
        country: 'Netherlands',
        region: 'North Jeolla',
      },
      {
        name: 'Gareth Marks',
        phone: '(213) 355-6886',
        email: 'neque.non@icloud.edu',
        list: 13,
        country: 'Nigeria',
        region: 'Hawaii',
      },
      {
        name: 'Shea Ayers',
        phone: '(443) 673-4635',
        email: 'rutrum.justo.praesent@yahoo.couk',
        list: 11,
        country: 'Italy',
        region: 'Junín',
      },
    ]),
  );
}
