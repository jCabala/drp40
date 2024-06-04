type TenantData = {
  name: string;
  flatID: string;
  image: string;
  description: string;
};

const tenants: TenantData[] = [
  {
    name: "Alice",
    flatID: "BkohhFIk6mo67kaOhhOD",
    image:
      "https://firebasestorage.googleapis.com/v0/b/drp40-46fde.appspot.com/o/tenantImages%2Ftenant_stock_1.jpeg?alt=media",
    description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
  obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut!`,
  },
  {
    name: "Bob",
    flatID: "C1D3IcU7B06jTcmgqKjr",
    image:
      "https://firebasestorage.googleapis.com/v0/b/drp40-46fde.appspot.com/o/tenantImages%2Ftenant_stock_2.jpeg?alt=media&token=f5f90e9e-1ca6-4e1a-847e-89cf2721b8aa",
    description: `earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
  tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
  quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
  sapiente officiis modi at sunt excepturi expedita sint?`,
  },
  {
    name: "Charlie",
    flatID: "MhwCHjCgk9wC7G6EU9rW",
    image:
      "https://firebasestorage.googleapis.com/v0/b/drp40-46fde.appspot.com/o/tenantImages%2Ftenant_stock_3.jpg?alt=media&token=bdbb5de5-960b-49dc-8663-4bea70b94a9f",
    description: `Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
  quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
  fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
  consequuntur! Commodi minima excepturi`,
  },
];

const tenantsByFlatID: (id: string) => TenantData[] = (id: string) =>
  tenants.filter((tenant) => tenant.flatID == id);

export { tenants, type TenantData, tenantsByFlatID };
