"use client";
import Card from "@/components/Card";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Home() {
  return (
    <div className="w-full flex flex-row">
      <section className="w-1/3">
        <Card
          image="https://i.ibb.co/r2zns1m/image-01.jpg"
          CardTitle="50+ Best creative website themes & templates"
          titleHref="/#"
          btnHref="/#"
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="View Details"
        />
        <Card
          image="https://i.ibb.co/0nbbWM9/image-02-1.jpg"
          CardTitle="Creative Card Component designs graphic elements"
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="View Details"
        />
        <Card
          image="https://i.ibb.co/dL9fH7N/image-03-1.jpg"
          CardTitle="The ultimate UX and UI guide to card design"
          CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
          Button="View Details"
        />
      </section>
      <section
        className="fixed right-0 w-1/3 h-screen bg-red-300 ml-4"
        style={{ width: "calc(66.666667% - 2rem)" }}
      >
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            className="w-full h-screen"
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        </APIProvider>
      </section>
    </div>
  );
}
