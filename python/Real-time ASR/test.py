from statement_keeper import get_statements
from datetime import time, datetime


if __name__ == '__main__':
    start_time = '17:31:00'
    end_time = '17:32:00'

    start = datetime.strptime(start_time, "%H:%M:%S").time()
    end = datetime.strptime(end_time, "%H:%M:%S").time()
    result = get_statements(start, end)
    print(result)