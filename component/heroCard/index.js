export default function HeroCard({ data }) {
  return (
    <figure className="card">
      <img
        style={{ width: "300px", height: "300px" }}
        src={data.image}
        alt="sq-sample17"
      />
      <figcaption>
        <i class="ion-android-open"></i>
      </figcaption>
      <a href="#"></a>
    </figure>
  );
}
