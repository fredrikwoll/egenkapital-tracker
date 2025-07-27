
type TitleSize =  'h1' | 'h2' | 'h3' | 'h4';
const Title = ({text, size = 'h3'}: {text: string, size: TitleSize}) => {
    const Headline = size;

    const titleClasses = {
        'h1': 'text-lg',
        'h2': 'text-md',
        'h3': 'text-sm',
        'h4': 'text-base'
    } 

    return (<Headline className={`${titleClasses[size]} font-medium text-text-primary`}>{text}</Headline>);
}

export default Title;