import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// TODO: Work with data from API

const CurrentWeatherCard = () => {
  return (
    <Card className="rounded border-0 ring-[1px] ring-primary/10">
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>CurrentWeatherCard</CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default CurrentWeatherCard;
