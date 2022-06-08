import Link from "next/link";

export default function HeroCard({ data }) {
  const link = `/hero/${data.id}`;
  return (
    <Link href={link} key={data.id}>
      <figure className="card">
        <img
          style={{ width: "300px", height: "300px" }}
          src={data.image}
          alt="sq-sample17"
        />
        <figcaption>
          <h1>{data.name}</h1>
        </figcaption>
      </figure>
    </Link>
  );
}
