type SpinnerIconProps = {
    class?: string
}

export const SpinnerIcon = (props: SpinnerIconProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.class}>
        <path d="M12 3.66667V2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12H20.3333C20.3333 16.6024 16.6024 20.3333 12 20.3333C7.39763 20.3333 3.66667 16.6024 3.66667 12C3.66667 7.39763 7.39763 3.66667 12 3.66667Z" fill="black" stroke="black" stroke-width="0.416667"/>
        </svg>
    )
}
