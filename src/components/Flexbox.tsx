
const Flexbox: React.FunctionComponent<{}> = props => {
    return (
         <pre style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
                {props.children}
            </pre>
    );
}

export default Flexbox;
