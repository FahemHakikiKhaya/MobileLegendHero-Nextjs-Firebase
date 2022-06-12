import "../component/heroCard/heroCard.css";
import ButtonAppBar from "../component/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ButtonAppBar />
      <Component {...pageProps} />;
    </div>
  );
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
