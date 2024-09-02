import { Datepicker } from "flowbite-react";

export default function Calendar() {
    console.log(Datepicker)
    return <Datepicker className="m-auto" language="pt-br" showClearButton={false} showTodayButton={false} inline />;
} 