export const IconDots = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
        <g transform="translate(2 2)">
          <path d="M0,9.25C0,2.313,2.313,0,9.25,0S18.5,2.313,18.5,9.25,16.187,18.5,9.25,18.5,0,16.187,0,9.25Z" transform="translate(0.75 0.75)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5px"></path><path d="M.5.5H.5" transform="translate(13.498 9.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5px"></path><path d="M.5.5H.5" transform="translate(9.499 9.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5px"></path><path d="M.5.5H.5" transform="translate(5.5 9.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5px"></path>
        </g>
    </svg>
  );
}