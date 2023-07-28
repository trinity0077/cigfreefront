const groupDataByDay = (data) => {
    const groupedData = Array(7).fill(0);
    const currentDate = new Date();

    data.forEach((element) => {
      const itemDate = new Date(element.dateSmoked);
      const diffDate = (currentDate.getDate() - itemDate.getDate() + 365) % 365;
      if (diffDate < 7) {
        groupedData[diffDate] += element.smokedCig;
      }
    });
    return groupedData.reverse();
  };

    export { groupDataByDay } ;