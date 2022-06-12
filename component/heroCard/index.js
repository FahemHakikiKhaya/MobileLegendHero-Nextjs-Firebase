import Link from "next/link";
import Image from "next/image";

export default function HeroCard({ data }) {
  const link = `/hero/${data.id}`;
  return (
    <Link href={link} key={data.id}>
      <figure className="card">
        <Image
          loader={() => data.image}
          unoptimized={true}
          width="300px"
          height="300px"
          src={data.image}
          alt="heroCard"
        />
        <figcaption>
          <h1>{data.name}</h1>
        </figcaption>
      </figure>
    </Link>
  );
}
