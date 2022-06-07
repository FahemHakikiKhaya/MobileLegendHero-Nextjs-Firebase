import "../component/heroCard/heroCard.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
// onSnapshot(
//   query(rolesColRef, where("heroId", "in", heroDetail.rolesId)),
//   (data) => {
//     const roleList = data.docs.map((roles) => {
//       return { ...roles.data().name };
//     });
//     heroDetail = { ...heroDetail, roles: roleList };
//   }
// );
