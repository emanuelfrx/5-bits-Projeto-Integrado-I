import { useQuery } from "@tanstack/react-query";
import { Carousel } from "flowbite-react";
import { makeRequest } from "../../axios";

export default function CarouselEvents() {

    console.log(Carousel)

    const { isLoading, error, data } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            return makeRequest.get("/events").then((res) => {
                return res.data
            })
        }
    })

    return (
        <div>
            <Carousel slide={false} className="h-72 w-full items-center sm:h-64 xl:h-80 2xl:h-96">
                {
                    error
                        ? console.log("Something is wrong")
                        : isLoading
                            ? <>Loading</>/*
                                    : currentRecords == null
                                        ? ""
                                        */: data.map((event) => (
                                <div key={event.idevent} className={`bg-[url('../../assets/upload/${event.img_event}')] bg-cover bg-green-300 dark:bg-green-500 h-full grid grid-cols-2 rounded-lg overflow-hidden shadow-2xl hover:cursor-pointer`}>
                                    <div className="col-span-1 h-full">
                                        <div className="w-full px-6 py-4">
                                            <div className="font-bold text-3xl mb-2">{event.title}</div>
                                            <p className="text-gray-700 dark:text-gray-300 text-base">
                                                
                                            </p>
                                        </div>
                                        <div className="w=full px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                        </div>
                                    </div>
                                    <img className="overflow-hidden rounded-l-full col-span-1 w-full h-full object-cover" src={"../../assets/upload/" + event.img_event} alt="Sunset in the mountains"></img>
                                </div>
                            ))
                }
            </Carousel>
        </div>
    )
}