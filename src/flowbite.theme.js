export default () => ({
  theme: {
    dropdown: {
      arrowIcon: "ml-2 w-4 self-center justify-center",
      content: "items-center  py-1 focus:outline-none",
      floating: {
        animation: "transition-opacity",
        arrow: {
          base: "absolute z-10 h-2 w-2 rotate-45",
          style: {
            dark: "bg-gray-900 dark:bg-gray-700",
            light: "bg-gray-900",
            auto: "bg-gray-900 dark:bg-gray-700",
          },
          placement: "-4px",
        },
        base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none",
        content:
          "py-1 text-sm text-gray-700 dark:text-gray-200 focus:outline-none",
        divider: "my-1 h-px bg-gray-100 dark:bg-gray-600 focus:outline-none",
        header:
          "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200 focus:outline-none",
        hidden: "invisible opacity-0",
        item: {
          container: "focus:outline-none",
          base: "focus:outline-none flex items-center justify-start py-2 px-4 text-sm text-white cursor-pointer w-full hover:bg-gray-900 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-900 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
          icon: "mr-2 h-4 w-4 focus:outline-none",
        },
        style: {
          dark: "bg-gray-900 text-white dark:bg-gray-700 focus:outline-none",
          light:
            "border border-gray-500 bg-gray-900 text-gray-900 focus:outline-none",
          auto: "focus:outline-none border border-gray-500 bg-gray-900 text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
        },
        target: "w-fit focus:outline-none",
      },
      inlineWrapper: "flex items-center focus:outline-none",
    },
  },
});
