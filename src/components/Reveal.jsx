import useReveal from '../hooks/useReveal';

export default function Reveal({as: Tag = 'div', delay = 0, className = '', style, children, ...rest}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? {'--delay': `${delay}ms`, ...style} : style}
      {...rest}>
      {children}
    </Tag>
  );
}
