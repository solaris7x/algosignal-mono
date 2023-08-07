import { Icon } from "@iconify/react";

interface GridItemProps {
  icon: string;
  title: string;
  description: string;
}

const GridItem = (props: GridItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center border-2 p-4 group hover:bg-blue-700">
      <Icon
        icon={props.icon}
        className="text-3xl text-blue-500 group-hover:text-black"
      />
      <h3 className="text-3xl">{props.title}</h3>
      <div className="">{props.description}</div>
    </div>
  );
};
export default GridItem;
