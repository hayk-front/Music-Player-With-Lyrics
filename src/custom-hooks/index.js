export const useRefHook = (intialRef) => {
  const [ref, setRef] = useState(null);

  useEffect(() => {
    setRef(intialRef);
  }, [intialRef, setRef]);

  return {ref}
}
