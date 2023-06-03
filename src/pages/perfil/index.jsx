import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import Layout from "../../components/Layout"

function Profile() {
  return (
    <Card>
      <CardHeader>Informaçãoes de usuário</CardHeader>

      <CardBody>
        aaaaaaaa
      </CardBody>
    </Card>
  )
}

Profile.layout = (page) => <Layout>{page}</Layout>

export default Profile