import { StoryblokComponent } from "@storyblok/react";

const Grid2x2 = ({ blok }) => {
  function getOrderByIndex(swap_first, swap_last, index) {
    let orderNumber = index + 1;
    if (swap_first && index == 0) {
      orderNumber = 2;
    }

    if (swap_first && index == 1) {
      orderNumber = 1;
    }

    if (swap_last && index == 2) {
      orderNumber = 4;
    }

    if (swap_last && index == 3) {
      orderNumber = 3;
    }
    return "order-" + orderNumber;
  }

  return (
    <div
      className={`
        grid grid-cols-2 grid-rows-2 
        auto-rows-max items-center relative
        phone:grid-cols-1 phone:grid-rows-none phone:before:!hidden phone:after:!hidden
        ${
          blok.show_x_border
            ? "after:content-[''] after:block after:absolute after:rounded-lg after:h-1 after:w-full after:inset-x-0 after:inset-y-0 after:m-auto after:bg-decoration"
            : ""
        }
        ${
          blok.show_y_border
            ? "before:content[''] before:block before:absolute before:w-1 before:h-full before:inset-x-0 before:inset-y-0 before:m-auto before:bg-decoration"
            : ""
        }`}
    >
      {blok.content.map((component, index) => {
        const order = getOrderByIndex(
          blok.swap_first_row,
          blok.swap_last_row,
          index
        );

        return (
          <div
            key={component._uid}
            className={`
            flex m-auto
            ${blok.padding_x} 
            ${blok.padding_y} 
            ${blok.column_width} 
            ${index % 2 === 0 ? "justify-start" : "justify-center"} 
            phone:w-full phone:!px-0 phone:!justify-center phone:${order}`}
          >
            <StoryblokComponent blok={component} key={component._uid} />
          </div>
        );
      })}
    </div>
  );
};

export default Grid2x2;
