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

  function getAlignmentByIndex(index) {
    let alignment = "justify-start";
    if (index == 1 || index == 3) {
      alignment = "justify-end";
    }
    return alignment;
  }

  return (
    <div
      className={`grid grid-cols-2 items-center ${blok.gap_x} ${blok.gap_y} phone:grid-cols-1 phone:grid-rows-4 phone:grid-rows-none`}
    >
      {blok.content.map((component, index) => {
        const order = getOrderByIndex(
          blok.swap_first_row,
          blok.swap_last_row,
          index
        );
        const alignment = getAlignmentByIndex(index);
        return (
          <div
            key={component._uid}
            className={`${blok.column_width} ${alignment} phone:w-full flex m-auto phone:${order}`}
          >
            <StoryblokComponent blok={component} key={component._uid} />
          </div>
        );
      })}
    </div>
  );
};

export default Grid2x2;
