import { GithubIcon } from "src/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "src/components/Tooltip";

export function GithubLinkBtn() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger key="github-link">
        <a
          href="https://github.com/oleksii-honchar/mdtt"
          target="_blank"
          className={`
          h-8          
          flex flex-row items-center justify-center
          focus:outline-none
          border-l pl-4
        `}
          rel="noreferrer"
        >
          <GithubIcon
            className={`
              h-6 w-6
              hover:h-8 hower:w-8
              fill-md-ref-pal-neutral500
              hover:fill-md-ref-pal-neutral900
              transition-all
            `}
          />
        </a>
      </TooltipTrigger>
      <TooltipContent className="Tooltip">
        Open the project&apos;s GitHub page.
      </TooltipContent>
    </Tooltip>
  );
}
