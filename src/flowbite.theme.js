import defaultFlowbiteTheme from './flowbite.theme.default'

export default (selectedTheme) => ({
  theme: {
    ...defaultFlowbiteTheme,
    accordion: {
      base: 'divide-y divide-gray-200 border-gray-200',
      content: {
        base: 'py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg',
      },
      flush: {
        off: 'rounded-sm border',
        on: 'border-b',
      },
      title: {
        arrow: {
          base: 'h-6 w-6 shrink-0',
          open: {
            off: '',
            on: 'rotate-180',
          },
        },
        base: `
          flex 
          w-full 
          bg-${selectedTheme.primary.slot2.background.class} 
          text-${selectedTheme.primary.slot1.background.class} 
          font-bold 
          items-center 
          justify-between 
          first:rounded-t-sm 
          last:rounded-b-sm 
          py-5 px-5 
          text-left 
          font-medium 
          text-gray-500
        `,
        flush: {
          off: `hover:bg-gray-100 dark:hover:bg-gray-800 dark:focus:ring-gray-800`,
          on: '!bg-transparent dark:!bg-transparent',
        },
        heading: '',
        open: {
          off: '',
          on: 'text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white',
        },
      },
    },
    card: {
      base: `
        flex 
        rounded-sm 
        border-${selectedTheme.surface.slot1.background.class}
        bg-${selectedTheme.surface.slot2.background.class}
        shadow-sm
        h-full
      `,
      children: 'flex h-full flex-col justify-start gap-4 p-6',
      horizontal: {
        off: 'flex-col',
        on: 'flex-col md:max-w-xl md:flex-row',
      },
      href: 'hover:bg-gray-100',
      img: {
        base: '',
        horizontal: {
          off: 'rounded-t-lg',
          on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
        },
      },
    },
    tab: {
      base: 'flex flex-col h-full',
      tablist: {
        base: `pl-10 flex text-center bg-${selectedTheme.surface.slot1.background.class}`,
        styles: {
          default: 'flex-wrap border-gray-200 dark:border-gray-700',
          underline: 'flex-wrap -mb-px border-gray-200 dark:border-gray-700',
          pills:
            'flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400',
          fullWidth:
            'hidden text-sm font-medium rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400',
        },
        tabitem: {
          base: `
          flex 
          items-center 
          justify-center 
          p-2 
          font-medium
          text-sm 
          first:ml-0 
          disabled:cursor-not-allowed 
          disabled:text-gray-400 
        `,
          styles: {
            default: {
              base: 'rounded-t-lg',
              active: {
                on: 'bg-gray-100 text-blue-600 focus:ring-none focus:bg-none active focus:outline-none',
                off: 'text-gray-500 hover:bg-gray-50 hover:text-gray-600',
              },
            },
            underline: {
              base: 'rounded-t-lg',
              active: {
                on: 'text-blue-600 rounded-t-lg border-b-2 border-blue-600 active',
                off: 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600',
              },
            },
            pills: {
              base: '',
              active: {
                on: 'rounded-lg bg-blue-600 text-white',
                off: 'rounded-lg hover:text-gray-900 hover:bg-gray-100',
              },
            },
            fullWidth: {
              base: 'ml-2 first:ml-0 w-full first:rounded-l-lg last:rounded-r-lg',
              active: {
                on: 'inline-block p-4 w-full text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white',
                off: 'bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700',
              },
            },
          },
          icon: 'mr-2 h-5 w-5',
        },
      },
      tabpanel: 'p-0',
    },
    dropdown: {
      floating: {
        target: 'w-full',
        base: 'left-0 z-10 rounded-b-lg divide-y divide-gray-100 shadow',
        animation: 'transition-opacity',
        hidden: 'invisible opacity-0',
        style: {
          dark: 'bg-gray-900 text-white dark:bg-gray-700',
          light: 'border border-gray-200 bg-white text-gray-900',
          auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
        },
        header: 'block py-2 px-4 text-sm text-gray-700 dark:text-gray-200',
        content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
        arrow: {
          base: 'absolute hidden z-10 h-2 w-2 rotate-45',
          style: {
            dark: 'hidden bg-gray-900 dark:bg-gray-700',
            light: 'bg-white',
            auto: 'hidden bg-white dark:bg-gray-700',
          },
          placement: '-4px',
        },
        item: {
          base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white',
          icon: 'mr-2 h-4 w-4',
        },
        divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
      },
      arrowIcon: 'ml-2 h-4 w-4 hidden',
      inlineWrapper: 'flex items-center',
      content: 'py-1 w-full',
    },
    pagination: {
      base: '',
      layout: {
        table: {
          base: 'text-sm text-gray-700 dark:text-gray-400',
          span: 'font-semibold text-gray-900 dark:text-white',
        },
      },
      pages: {
        base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
        showIcon: 'inline-flex',
        previous: {
          base: `
          ml-0 
          rounded-l-lg 
          border 
          border-gray-300 
          bg-${selectedTheme.surface.slot2.background.class} 
          py-2 
          px-3 
          leading-tight 
          text-${selectedTheme.primary.slot1.background.class} 
          hover:bg-${selectedTheme.surface.slot3.background.class} 
          hover:text-${selectedTheme.surface.slot3.text.class} 
        `,
          icon: 'h-5 w-5',
        },
        next: {
          base: `
            rounded-r-lg 
            border 
            border-gray-300 
            bg-${selectedTheme.surface.slot2.background.class} 
            py-2 
            px-3 
            leading-tight 
            text-${selectedTheme.primary.slot1.background.class} 
            hover:bg-${selectedTheme.surface.slot3.background.class} 
            hover:text-${selectedTheme.surface.slot3.text.class} 
          `,
          icon: 'h-5 w-5',
        },
        selector: {
          base: 'w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
          active:
            'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white',
        },
      },
    },
    toast: {
      base: `
        flex 
        w-full 
        max-w-xs 
        items-center 
        rounded-lg 
        bg-white 
        p-4 
        text-${selectedTheme.error.slot1.background.class} 
        border shadow border-${selectedTheme.error.slot1.background.class}
      `,
      closed: 'opacity-0 ease-out',
      removed: 'hidden',
      toggle: {
        base: `
          -mx-1.5 
          -my-1.5 
          ml-auto 
          inline-flex 
          h-8 
          w-8 
          rounded-lg 
          bg-white 
          p-1.5 
          text-${selectedTheme.error.slot1.background.class} 
          hover:bg-gray-100 
          hover:text-gray-900 
          focus:ring-2 
          focus:ring-gray-300
        `,
        icon: 'h-5 w-5 shrink-0',
      },
    },

    formControls: {
      textInput: {
        base: 'flex',
        addon: `
          inline-flex 
          items-center 
          rounded-l-md 
          border 
          border-r-0 
          border-gray-300 
          bg-gray-200 px-3 
          text-sm 
          text-gray-900
        `,
        field: {
          base: 'relative w-full',
          icon: {
            base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
            svg: 'h-5 w-5 text-gray-500',
          },
          input: {
            base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
            sizes: {
              sm: 'p-2 sm:text-xs',
              md: 'p-2.5 text-sm',
              lg: 'sm:text-md p-4',
            },
            colors: {
              gray: `
                bg-${selectedTheme.surface.slot1.background.class}
                border-${selectedTheme.surface.slot3.background.class}
                text-${selectedTheme.surface.slot1.text.class}
                placeholder-${selectedTheme.primary.slot1.background.class}
                focus:border-${selectedTheme.primary.slot1.background.class}
                focus:ring-${selectedTheme.primary.slot1.background.class}
              `,
              info: `
                border-blue-500 
                bg-blue-50 
                text-blue-900 
                placeholder-blue-700 
                focus:border-blue-500 
                focus:ring-blue-500
              `,
              failure: `
                border-red-500 
                bg-red-50 
                text-red-900 
                placeholder-red-700 
                focus:border-red-500 
                focus:ring-red-500
              `,
              warning: `
                border-yellow-500 
                bg-yellow-50 
                text-yellow-900 
                placeholder-yellow-700 
                focus:border-yellow-500 
                focus:ring-yellow-500 
              `,
              success: `
                border-green-500 
                bg-green-50 
                text-green-900 
                placeholder-green-700 
                focus:border-green-500 
                focus:ring-green-500 
              `,
            },
            withIcon: {
              on: 'pl-10',
              off: '',
            },
            withAddon: {
              on: 'rounded-r-lg',
              off: 'rounded-lg',
            },
            withShadow: {
              on: 'shadow-sm',
              off: '',
            },
          },
        },
      },
    },
    modal: {
      base: 'fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-gray-900 bg-opacity-20',
        off: 'hidden',
      },
      content: {
        base: 'drop-shadow-lg relative h-full w-full p-4 md:h-auto',
        inner: `
        relative 
        rounded-lg 
        bg-${selectedTheme.surface.slot2.background.class} 
        shadow 
      `,
      },
      body: {
        base: 'p-6',
        popup: 'pt-0',
      },
      header: {
        base: `
          flex 
          items-start 
          justify-between 
          rounded-t 
          border-b 
          border-${selectedTheme.surface.slot3.background.class} p-5
          bg-${selectedTheme.surface.slot1.background.class} 
        `,
        popup: '',
        title: 'text-2xl text-bold text-gray-900',
        close: {
          base: `
            ml-auto 
            inline-flex 
            items-center 
            rounded-lg 
            bg-transparent 
            p-1.5 
            text-lg
            text-${selectedTheme.primary.slot1.background.class} 
          `,
          icon: 'h-5 w-5',
        },
      },
      footer: {
        base: `
          flex 
          items-center 
          space-x-2 
          rounded-b 
          border-t 
          border-${selectedTheme.surface.slot2.background.class} 
          p-6
        `,
        popup: '',
      },
      sizes: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
      positions: {
        'top-left': 'items-start justify-start',
        'top-center': 'items-start justify-center',
        'top-right': 'items-start justify-end',
        'center-left': 'items-center justify-start',
        center: 'items-center justify-center',
        'center-right': 'items-center justify-end',
        'bottom-right': 'items-end justify-end',
        'bottom-center': 'items-end justify-center',
        'bottom-left': 'items-end justify-start',
      },
    },
    button: {
      color: {
        info: `
          text-white 
          bg-${selectedTheme.primary.slot1.background.class} 
          border 
          border-transparent 
          hover:bg-${selectedTheme.primary.slot3.background.class} 
          hover:text-${selectedTheme.primary.slot3.text.class} 
          focus:ring-4 
          focus:ring-${selectedTheme.primary.slot4.background.class} 
          disabled:hover:bg-${selectedTheme.primary.slot2.background.class} 
        `,
      },
    },
    sidebar: {
      base: 'h-full',
      inner: `
        h-full 
        overflow-y-auto 
        overflow-x-hidden 
        rounded 
        bg-${selectedTheme.surface.slot1.background.class}
        py-4 px-3
      `,
      collapsed: {
        on: 'w-16',
        off: 'w-64',
      },
      collapse: {
        button: `
          group 
          flex 
          w-full 
          items-center 
          rounded-lg 
          p-2 
          text-base 
          font-bold 
          text-${selectedTheme.surface.slot1.text.class}
          transition 
          duration-75 
          hover:bg-gray-100
        `,
        icon: {
          base: 'h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
          open: {
            off: '',
            on: 'text-gray-900',
          },
        },
        label: {
          base: 'ml-3 flex-1 whitespace-nowrap text-left',
          icon: 'h-6 w-6',
        },
        list: 'space-y-2 py-2',
      },
      cta: {
        base: 'mt-6 rounded-lg p-4',
        color: {
          blue: 'bg-blue-50',
          dark: 'bg-dark-50',
          failure: 'bg-red-50',
          gray: 'bg-alternative-50',
          green: 'bg-green-50',
          light: 'bg-light-50',
          red: 'bg-red-50',
          purple: 'bg-purple-50',
          success: 'bg-green-50',
          yellow: 'bg-yellow-50',
          warning: 'bg-yellow-50',
        },
      },
      item: {
        base: `
          flex 
          items-center 
          no-underline
          capitalize
          justify-center 
          rounded-lg 
          p-2 
          text-base 
          font-bold
          text-${selectedTheme.surface.slot1.text.class}
          hover:bg-${selectedTheme.primary.slot2.background.class}
          hover:text-${selectedTheme.primary.slot1.background.class}
        `,
        active: `bg-${selectedTheme.primary.slot2.background.class} text-${selectedTheme.primary.slot1.background.class}`,
        collapsed: {
          insideCollapse: 'group w-full pl-8 transition duration-75',
          noIcon: 'font-bold',
        },
        content: {
          base: 'px-3 flex-1 whitespace-nowrap',
        },
        icon: {
          base: 'h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900',
          active: 'text-gray-700',
        },
      },
      items: '',
      itemGroup:
        'mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0',
      logo: {
        base: 'mb-5 flex items-center pl-2.5',
        collapsed: {
          on: 'hidden',
          off: 'self-center whitespace-nowrap text-xl font-semibold',
        },
        img: 'mr-3 h-6 sm:h-7',
      },
    },
    breadcrumb: {
      item: {
        base: 'group flex items-center',
        chevron: 'mx-1 h-6 w-6 text-gray-400 group-first:hidden md:mx-2',
        href: {
          off: 'flex items-center text-sm font-medium text-gray-500',
          on: 'flex items-center text-sm no-underline font-bold text-gray-700 hover:text-gray-900',
        },
        icon: 'mr-2 h-4 w-4',
      },
      list: 'flex items-center',
    },
  },
});