export const transformGeneralInfo = (data: any[]) => {
    return data.map((item) =>
      Object.fromEntries(
        Object.entries(item).filter(([_, value]) => typeof value !== "number")
      )
    );
  };