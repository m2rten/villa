import unittest, requests, json
 
class TestUM(unittest.TestCase):
 
#    def setUpClass(self):
#        print ('setUp')
#       pass

    def test_nouded(self):
        print ("Running test_nouded")
        url = 'http://localhost:3000/api/v1/loo_nouded'
        payload = {"kaup": "Labi api","kpv":"2017-04-01","price":31,"student_price":20}
        headers = {'content-type': 'application/json'}
        response = requests.post(url, data=json.dumps(payload), headers=headers, auth=('admin', '3ston51LLa'))
        self.assertEqual( 3*4, 12)

    def test_status(self):
        url = 'http://localhost:3000/api/v1/statuses'
        print ("Running test_status")
        headers = {'content-type': 'application/json'}
        response = requests.get(url, headers=headers, auth=('admin', '3ston51LLa'))
        expected = [{"status": "active"}, {"status": "deactive"}, {"status": "mahakantud"}]
        self.assertEqual(response.json(),expected)
 
def suite():
   ts = unittest.TestSuite()
   ts.addTest(TestUM('test_nouded'))
   ts.addTest(TestUM('test_status'))
   return ts
 
if __name__ == '__main__':

   #log_file = 'log_file.txt'
   #'''f = open(log_file, "w")
   runner = unittest.TextTestRunner()
   test_suite = suite()
   runner.run(test_suite)
   #f.close()